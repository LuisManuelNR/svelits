<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiCloseCircle } from '@mdi/js'

	type T = $$Generic
	type InputRules<R> = Array<(inputValue: R) => string | boolean>
	type SuportedInputs =
		| {
				type: 'text' | 'email' | 'tel' | 'password' | 'date'
				rules: InputRules<string>
				value: string
		  }
		| {
				type: 'number'
				value: number
				rules: InputRules<number>
		  }
		| {
				type: 'select'
				value: T
				rules: InputRules<T>
		  }

	export let label = ''
	export let placeholder = ''
	export let rules: SuportedInputs['rules'] = []
	export let type: SuportedInputs['type'] = 'text'
	export let value: SuportedInputs['value'] = ''
	export let disabled = false
	export let loading = false

	function onInput(e: Event) {
		const target = e.target as HTMLInputElement
		value = type === 'number' ? target.valueAsNumber : target.value
	}

	let active = false
	let initialState = false
	let hint: string | boolean = ''
	let shake = false
	$: {
		hint = validate(value)
	}
	function validate(v: SuportedInputs['value']) {
		let ilegal: string | boolean = ''
		if (initialState && rules.length) {
			for (let i = 0; i < rules.length; i++) {
				// @ts-ignore
				ilegal = rules[i](v)
				if (ilegal) {
					break
				}
			}
		}
		initialState = true
		return ilegal || ''
	}
	const validatorFunc = () => {
		hint = validate(value)
		if (hint) {
			shake = true
			setTimeout(() => {
				shake = false
			}, 820)
		}
		return hint
	}
	// if this input is inside a form register this rules, so when the form is submitted can be validated
	const formValidator: Array<typeof validate> = getContext('validators')
	if (formValidator) formValidator.push(validatorFunc)
	$: activeLabel = active || placeholder || (value !== null && value !== undefined && value !== '')

	// on browser autofill input trigger a transitionstart event, so we can animate label to not overlap the autofill text
	function onTransitionStart() {
		active = true
	}

	onMount(() => {
		const touchSuport = 'ontouchstart' in window
		if (!touchSuport && type === 'date') {
			active = true
		}
		return () => {
			if (formValidator) {
				// unregister from a form on destroy
				const index = formValidator.indexOf(validatorFunc)
				if (index > -1) {
					formValidator.splice(index, 1)
				}
			}
		}
	})
</script>

<div
	class="c-input px-2 gap-2 d-flex align-center"
	class:active={activeLabel}
	class:error-state={hint}
	class:shake-animation={shake}
	class:disabled={disabled || loading}
	class:loading-inline={loading}
	on:click
	on:keydown
>
	<slot name="prepend" />
	<label>
		<div class="label-text">{label}</div>
		<slot>
			<input
				disabled={disabled || loading}
				{type}
				{value}
				{placeholder}
				on:input={onInput}
				on:transitionstart={onTransitionStart}
				on:change
			/>
		</slot>
	</label>
	{#if hint}
		<CIcon icon={mdiCloseCircle} />
	{:else}
		<slot name="append" />
	{/if}
	<div class="hint">{hint}</div>
</div>

<style lang="scss">
	@layer CInput {
		.c-input {
			border: 1px solid var(--border-color-input, var(--n-500));
			border-radius: var(--size-1);
			transition: all 0.2s;
			color: var(--text-color-input, var(--n-500));
			margin-bottom: var(--size-4);
			position: relative;
			label {
				flex-grow: 1;
				min-height: 48px;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			input,
			:global(textarea) {
				border: none;
				outline: none;
				width: 100%;
				font-size: 1.1rem;
				font-family: inherit;
				background-color: transparent;
				color: var(--n-500);
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus {
					border: none;
					box-shadow: none;
					-webkit-text-fill-color: var(--n-500);
					transition: background-color 5000s ease-in-out 0s;
				}
				&::placeholder {
					color: var(--n-300);
				}
			}
			.label-text {
				user-select: none;
				pointer-events: none;
				transform: translate(var(--translate-label, 0, 13px)) scale(var(--scale-label, 1.3));
				transition: all 170ms;
				color: var(--text-color-input, var(--n-400));
				transform-origin: left center;
				cursor: text;
				white-space: nowrap;
				font-size: 0.8rem;
				letter-spacing: 0.009375em;
				width: fit-content;
			}
			.hint {
				font-size: 0.9rem;
				color: var(--text-color-input);
				user-select: none;
				line-height: 1;
				position: absolute;
				bottom: -1.1rem;
			}
			&:focus-within,
			&.active {
				--translate-label: 0px, 3px;
				--scale-label: 1;
			}
			&:focus-within {
				--text-color-input: var(--success);
				--border-color-input: var(--success);
			}
			&.error-state {
				--text-color-input: var(--error);
				--border-color-input: var(--error);
			}
			:disabled,
			&.disabled {
				pointer-events: none;
				color: var(--n-300);
				--text-color-input: currentColor;
				--border-color-input: currentColor;
				&::before {
					content: '';
					position: absolute;
					inset: 0;
					background-color: rgba(0, 0, 0, 0.082);
				}
			}
		}
	}
</style>
