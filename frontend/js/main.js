document.getElementById('generateBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    const contentType = document.getElementById('contentType').value;
    const outputSection = document.getElementById('outputSection');
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('errorMsg');

    if (!userInput) {
        errorMsg.textContent = 'Please enter some text to generate content.';
        errorMsg.classList.remove('hidden');
        outputSection.classList.add('hidden');
        loading.classList.add('hidden');
        return;
    }

    // Clear previous output and show loading
    errorMsg.classList.add('hidden');
    outputSection.classList.add('hidden');
    loading.classList.remove('hidden');
    output.innerHTML = '';

    try {
        const response = await fetch('http://127.0.0.1:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: userInput,
                content_type: contentType
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Server error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();

        const generated = data.generated_content || 'No content generated.';
        const options = generated.split(/\*\*Option \d:/);

        output.innerHTML = ''; // Clear previous output

        options.forEach((opt, index) => {
            if (opt.trim() === '') return;

            const container = document.createElement('div');
            container.style.border = '1px solid #ccc';
            container.style.padding = '1em';
            container.style.marginBottom = '1em';
            container.style.background = '#f9f9f9';
            container.style.borderRadius = '8px';

            const heading = document.createElement('h3');
            heading.textContent = `Option ${index}`;
            heading.style.marginTop = '0';

            const content = document.createElement('pre');
            content.style.whiteSpace = 'pre-wrap';
            content.textContent = opt.trim();

            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy Option';
            copyBtn.style.marginTop = '0.5em';
            copyBtn.style.cursor = 'pointer';

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(opt.trim())
                    .then(() => {
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => copyBtn.textContent = 'Copy Option', 1500);
                    })
                    .catch(() => alert('Failed to copy. Please copy manually.'));
            });

            container.appendChild(heading);
            container.appendChild(content);
            container.appendChild(copyBtn);

            output.appendChild(container);
        });

        outputSection.classList.remove('hidden');

    } catch (err) {
        errorMsg.textContent = `Error: ${err.message}`;
        errorMsg.classList.remove('hidden');
        outputSection.classList.add('hidden');
    } finally {
        loading.classList.add('hidden');
    }
});
