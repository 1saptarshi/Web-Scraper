document.addEventListener('DOMContentLoaded', function () {
    const scrapeBtn = document.getElementById('scrape-btn');
    const urlInput = document.getElementById('url-input');
    const contentDiv = document.getElementById('content');

    scrapeBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!url) {
            contentDiv.innerHTML = '<p class="text-red-500">Please enter a valid URL.</p>';
            return;
        }

        try {
            const apiKey = 'YOUR_SCRAPERAPI_KEY'; // Replace with your ScraperAPI key
            const response = await fetch(`https://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(url)}`);
            const data = await response.text();
            
            // Display the scraped content in the content div
            contentDiv.innerHTML = `<pre class="whitespace-pre-wrap">${escapeHtml(data)}</pre>`;
        } catch (error) {
            console.error('Error fetching the content:', error);
            contentDiv.innerHTML = '<p class="text-red-500">Error fetching the content. Please try again later.</p>';
        }
    });

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
