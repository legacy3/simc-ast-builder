import { toast } from '@zerodevx/svelte-toast';

export const showSuccessToast = () => {
	return toast.push('<strong>Success</strong><br>The shared code was loaded', {
		theme: {
			'--toastColor': 'var(--text-color)',
			'--toastBackground': 'var(--card-bg)',
			'--toastBorderRadius': 'var(--border-radius)',
			'--toastBoxShadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
			'--toastBarBackground': 'var(--success-color)',
			'--toastBarHeight': '4px',
			'--toastBorder': '0 0 0 4px var(--success-color)',
			'--toastPadding': 'var(--space-3) var(--space-4)',
			'--toastWidth': '400px'
		},
		duration: 5000
	});
};
