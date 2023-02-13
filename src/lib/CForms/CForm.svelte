<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte'
	const validator: Array<() => string | true> = []
	setContext('validators', validator)
	const dispatch = createEventDispatcher<{ submit: SubmitEvent }>()
	export function onSubmit(e: SubmitEvent) {
		const submiter = e.submitter
		if (!submiter || submiter.getAttribute('type') !== 'submit') return
		let invalidForm = false
		validator.forEach((f) => {
			const invalidInput = f()
			if (invalidInput) {
				invalidForm = true
			}
		})
		if (!invalidForm) {
			dispatch('submit', e)
		} else {
			requestAnimationFrame(() => {
				const firstInputError = document.querySelector('.error-state')
				if (firstInputError) {
					firstInputError.scrollIntoView({ behavior: 'smooth', block: 'center' })
				}
			})
		}
	}
</script>

<form novalidate on:submit|preventDefault={onSubmit}>
	<slot />
</form>
