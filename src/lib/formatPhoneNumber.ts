export const formatPhoneNumber = (phoneNumber: string) => {
	const cleaned = phoneNumber.replace('+38', '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

	if (match) {
		return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
	}

	return null;
}

export const formatFreePhoneNumber = (phoneNumber: string) => {
	const match = phoneNumber.match(/^(\d)(\d{3})(\d{3})(\d{3})$/);

	if (match) {
		return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
	}

	return null;
}
