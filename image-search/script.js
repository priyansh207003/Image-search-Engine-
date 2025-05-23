const accessKey = "lIyDvgOwwnme8E1KQwi5IFSz6SSwdWawpB0wSpiBXmM";

        const searchForm = document.getElementById("search-form");
        const searchBox = document.getElementById("search-box");
        const searchResult = document.getElementById("search-result");
        const showMoreBtn = document.getElementById("show-more-btn");

        let keyword = "";
        let page = 1;

        async function searchImages() {
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length > 0) {
                data.results.forEach(result => {
                    const image = document.createElement("img");
                    image.src = result.urls.small;

                    const imageLink = document.createElement("a");
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.appendChild(image);

                    searchResult.appendChild(imageLink);
                });
                showMoreBtn.style.display = "block";
            } else if (page === 1) {
                searchResult.innerHTML = "<p>No results found. Please try a different search query.</p>";
                showMoreBtn.style.display = "none";
            }
        }

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            keyword = searchBox.value;
            page = 1;
            searchResult.innerHTML = "";
            searchImages();
        });

        showMoreBtn.addEventListener("click", () => {
            page++;
            searchImages();
        });