import Swal from 'sweetalert2';

export function showAlert(label: string): Promise<boolean> {
	return Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ccc",
		cancelButtonColor: "#5246ce",
		confirmButtonText: "Yes, delete it!",
		color: "#333",
		customClass: {
			confirmButton: "text-confirm-button",
			htmlContainer: "text-desc"
		}
	}).then(result => {
		if(result.isConfirmed) {
			Swal.fire({
				title: "Deleted!",
				text: `Your ${label} has been deleted.`,
				icon: "success",
				confirmButtonColor: "#5246ce",
				color: "#333",
				customClass: {
					confirmButton: "button-deleted",
					htmlContainer: "desc-deleted",
				}
			})
			return true
		}
		return false
	})
}