$(function() {
    // Menampilkan list project
    let projectList = document.querySelector("#projectList");

    for (let idx in projects) {
        let project = document.createElement('div');
        project.setAttribute("class", "py-5 d-block");

        if (idx%2 == 0) {
            project.innerHTML = '<img src="' + projects[idx].img_path + '" class="img-fluid float-lg-start d-table">';
            project.innerHTML += `
                                <div class="text-fluid align-items-center text-center text-lg-start d-table">
                                    <h5 class="post-title pt-4 pt-lg-0">${projects[idx].title}</h5>
                                    <p class="post-subtitle">${projects[idx].desc}</p>
                                    <p class="text-muted">${projects[idx].tag.join(', ')}</p>
                                    <a type="button" class="btn btn-primary mt-xl-5 mt-md-2 mt-3 btn-lg" href="${projects[idx].github_url}" target="_blank">
                                        <i class="fab fa-github pe-2"></i>Github
                                    </a>
                                </div><br>
            `;
        } else {
            project.innerHTML = '<img src="' + projects[idx].img_path + '" class="img-fluid float-lg-end mx-auto d-table">';
            project.innerHTML += `
                                <div class="text-fluid align-items-center text-center text-lg-end d-table">
                                    <h5 class="post-title pt-4 pt-lg-0">${projects[idx].title}</h5>
                                    <p class="post-subtitle">${projects[idx].desc}</p>
                                    <p class="text-muted">${projects[idx].tag.join(', ')}</p>
                                    <a type="button" class="btn btn-primary mt-xl-5 mt-md-2 mt-5 btn-lg" href="${projects[idx].github_url}" target="_blank">
                                        <i class="fab fa-github pe-2"></i>Github
                                    </a>
                                </div><br>
            `;
        };

        projectList.appendChild(project);
    };


    // Menampilkan link footer
    let footerLink = document.querySelector("#footer");

    for (let idx in links) {
        let link = document.createElement('li');
        link.setAttribute("class", "list-inline-item");
        
        link.innerHTML = `
                        <a href="${links[idx].url}">
                            <span class="fa-stack fa-lg">
                                <i class="fas fa-circle fa-stack-2x"></i>
                                <i class="fab ${links[idx].ico} fa-stack-1x fa-inverse"></i>
                            </span>
                        </a>
        `;
        footerLink.appendChild(link)
    };


    // Scroll function for animation
    $(document).scroll(function () {
        var $nav = $(".navbar, .fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});