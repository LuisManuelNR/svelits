import CNotify from './CNotify.svelte'

type CNotifierParams = {
	title: string
	text?: string
	timeout?: number
	target?: string
}

if (!import.meta.env.SSR) {
	if (!document.querySelector('.notifications-holder')) {
		const defaultContainer = document.createElement('div')
		defaultContainer.classList.add('notifications-holder')
		document.body.append(defaultContainer)
	}
}

function send({ title = '', text = '', timeout = 0, type = '', target = '.notifications-holder' }) {
	const container = document.querySelector(target)
	if (!container) throw 'Missing target element for Display notifications'
	const noty = new CNotify({
		target: container,
		props: {
			title,
			text,
			type,
			visible: true
		},
		intro: true
	})
	let timer: ReturnType<typeof setTimeout>
	if (timeout) {
		timer = setTimeout(() => {
			noty.close()
		}, timeout)
	}
	noty.$on('close', () => {
		noty.$destroy()
		if (timer) {
			clearTimeout(timer)
		}
	})
}

const DEFAULT_TIMEOUT = 4000

function error({
	title = '',
	text = '',
	timeout = DEFAULT_TIMEOUT,
	target
}: CNotifierParams): void {
	send({ title, text, timeout, type: 'error', target })
}

function info({ title = '', text = '', timeout = DEFAULT_TIMEOUT, target }: CNotifierParams): void {
	send({ title, text, timeout, type: 'brand', target })
}

function success({
	title = '',
	text = '',
	timeout = DEFAULT_TIMEOUT,
	target
}: CNotifierParams): void {
	send({ title, text, timeout, type: 'success', target })
}

export const CNotifier = {
	error,
	info,
	success
}
