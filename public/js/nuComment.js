let count = 0;
// unction to disable button if no text is entered
function btnToggle(id) {
	let aNuComment = document.getElementById(`theComment${id}`);
	let button = document.getElementById(`theBtn${id}`);
	button.disabled = true; //setting button state to disabled
	// Disable button if no content
	aNuComment.addEventListener('keyup', () => {
		if (document.getElementById(`theComment${id}`).value === '') {
			button.disabled = true; //button remains disabled
		} else {
			button.disabled = false; //button is enabled
		}
	});
}

function makeComment(id) {
	let comment = document.getElementById(`theComment${id}`);
	let aNuCommentBtn = document.getElementById(`theBtn${id}`);

	count = count + 1;
	if (count % 2 === 0) {
		comment.setAttribute('class', `commentArea`);
		aNuCommentBtn.setAttribute('class', `commentTheBtn`);
		btnToggle(id);
	} else {
		comment.setAttribute('class', 'hide');
		aNuCommentBtn.setAttribute('class', `hide`);
	}
}

const makeAComment = async (id) => {
	const description = document.getElementById(`theComment${id}`).value;
	const user_id = document.querySelector('.userId').value;
	const comment_username = document.querySelector('.commentUserName').value;
	const to_what = id;
	const to_whom = document.getElementById(`blogUserName${id}`).value;
	if (user_id && to_what && to_whom && description && comment_username) {
		const response = await fetch('/api/users/comments', {
			method: 'POST',
			body: JSON.stringify({
				user_id,
				to_whom,
				to_what,
				description,
				comment_username,
			}),
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			setTimeout(() => {
				document.location.replace('/');
			}, 2000);
			document.querySelector('.blogDetails').value = '';
			document.querySelector('.blogTitle').value = '';
		});
	}
};

function vuComs(id) {
	let Comments = document.getElementById(`showComs${id}`);
	count = count + 1;

	if (count % 2 === 0) {
		Comments.setAttribute('class', 'hide');
	} else {
		Comments.setAttribute('class', 'commentsBox');
	}
}
