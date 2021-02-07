console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', async function(e) {
    fetch('/subscribe', {method: 'POST',
        body: JSON.stringify({ email: document.getElementById('email').value }), headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(function(response) {
            if(response.ok) {
                alert('Subscribed! Stay tuned.')
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
});