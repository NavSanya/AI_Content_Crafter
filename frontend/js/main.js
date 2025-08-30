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
        const response = await fetch('https://ai-content-crafter-backend.onrender.com/generate', {
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

        // NEW: Use a regex with a global flag to find all options
        const optionsRegex = /(Option \d+\s*(?:\([^)]*\))?:)([\s\S]*?)(?=Option \d+\s*(?:\([^)]*\))?:|$)/g;
        let match;
        const optionBlocks = [];

        // Find all matches
        while ((match = optionsRegex.exec(generated)) !== null) {
            optionBlocks.push({
                heading: match[1],
                content: match[2].trim()
            });
        }

        output.innerHTML = ''; // Clear previous output

        if (optionBlocks.length > 0) {
            // If options are found, process each one
            optionBlocks.forEach(optBlock => {
                const container = document.createElement('div');
                container.classList.add('option-box');

                const heading = document.createElement('h3');
                heading.textContent = optBlock.heading.trim();
                container.appendChild(heading);

                const content = document.createElement('div');
                content.innerHTML = marked.parse(optBlock.content);
                container.appendChild(content);

                const copyBtn = document.createElement('button');
                copyBtn.textContent = 'Copy Option';
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(content.textContent.trim())
                        .then(() => {
                            copyBtn.textContent = 'Copied!';
                            setTimeout(() => copyBtn.textContent = 'Copy Option', 1500);
                        })
                        .catch(() => alert('Failed to copy. Please copy manually.'));
                });
                container.appendChild(copyBtn);

                output.appendChild(container);
            });
        } else {
            // If no specific options are found, render the entire content in a single box
            const container = document.createElement('div');
            container.classList.add('option-box');
            const content = document.createElement('div');
            content.innerHTML = marked.parse(generated.trim());
            container.appendChild(content);

            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy Text';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(content.textContent.trim())
                    .then(() => {
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => copyBtn.textContent = 'Copy Text', 1500);
                    })
                    .catch(() => alert('Failed to copy. Please copy manually.'));
            });
            container.appendChild(copyBtn);

            output.appendChild(container);
        }

        outputSection.classList.remove('hidden');

    } catch (err) {
        errorMsg.textContent = `Error: ${err.message}`;
        errorMsg.classList.remove('hidden');
        outputSection.classList.add('hidden');
    } finally {
        loading.classList.add('hidden');
    }
});
