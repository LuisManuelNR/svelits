export interface ThemeConfig {
  [key: string]: {
    brand?: string
    neutral?: string
    error?: string
    success?: string
    info?: string
    contrast?: string
    [key: string]: string | undefined
  }
}

const LIGHT_COLOR = '#d8dee3'
const DARK_COLOR = '#212529'

export const DEFAULTS_THEME: ThemeConfig = {
  light: {
    brand: '#ff6047',
    'n-100': '#f0f1f4',
    'n-200': '#e1e4ea',
    'n-300': '#d3d7df',
    'n-400': '#c4c9d4',
    error: '#D72638',
    success: '#169873',
    info: '#FFD3BA',
    contrast: DARK_COLOR,
  },
  dark: {
    brand: '#D64933',
    'n-100': '#555e77',
    'n-200': '#495269',
    'n-300': '#404859',
    'n-400': '#363c4a',
    error: '#D72638',
    success: '#169873',
    info: '#FFD3BA',
    contrast: LIGHT_COLOR
  }
}

export function generateTheme(config?: ThemeConfig) {
  const useConf = mergeDeep(DEFAULTS_THEME, config || {})
  // generate theme vars
  let result = generateAllVars(useConf)
  // generate every theme vars setup
  let isFirst = true
  for (const theme in useConf) {
    if (isFirst) {
      result += generateLocalTheme(useConf[theme], theme)
    }
    if (theme === 'dark') {
      result += `@media (prefers-color-scheme: dark) {
        ${generateLocalTheme(useConf[theme], theme)}
      }\n`
    }
    result += generateLocalTheme(useConf[theme], theme, true)
    isFirst = false
  }
  result += generateColorClasses(useConf)
  return result
}

function generateAllVars(useConf: ThemeConfig) {
  let result = ':root {\n'
  for (const theme in useConf) {
    for (const colorName in useConf[theme]) {
      const color = useConf[theme][colorName]
      if (color) {
        const isHex = /^#([0-9a-f]{3}){1,2}$/i.test(color)
        if (!isHex) throw new Error('Colors must be in hex representation')
        result += `\t--${colorName}-${theme}: ${color};\n`
      }
    }
    result += '\n'
  }
  result += '}\n'
  return result
}

function generateLocalTheme(theme: ThemeConfig[string], themeName: string, useColorScheme = false) {
  const scheme = isLightColor(theme.contrast) ? 'dark' : 'light'
  const prefix = useColorScheme ? `.${scheme}-theme` : ':root'
  let result = `${prefix} {\n\tcolor-scheme: ${scheme};\n`
  for (const colorName in theme) {
    result += `\t--${colorName}: var(--${colorName}-${themeName});\n`
  }
  result += '}\n'
  return result
}

function generateColorClasses(useConf: ThemeConfig) {
  let result = ''
  const processedColors: Record<string, boolean> = {}
  for (const theme in useConf) {
    for (const colorName in useConf[theme]) {
      if (processedColors[colorName]) continue
      result += `.${colorName} { background-color: var(--${colorName}); outline-color: var(--${colorName}); border-color: var(--${colorName}); }
      .${colorName}-text { color: var(--${colorName}) }\n`
      processedColors[colorName] = true
    }
  }
  return result
}

function mergeDeep<T extends Record<string, any>>(target: T, source: T): T {
  const _target = target || {}
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], mergeDeep(_target[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(_target, source)
  return _target
}

function isLightColor(hexColor = '') {
  try {
    if (!hexColor) return false
    const hex = hexColor.replace('#', '')
    const R = parseInt(hex.substring(0, 2), 16)
    const G = parseInt(hex.substring(2, 4), 16)
    const B = parseInt(hex.substring(4, 6), 16)
    const brightness = (Math.round(R * 299) + Math.round(G * 587) + Math.round(B * 114)) / 1000
    return brightness >= 128
  } catch (error) {
    return false
  }
}