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

    // FORM VALIDATION
    const fname = $("#name");
    const femail = $("#email");
    const fphone = $("#phone");
    const fmessage = $("#message");

    const fsubmit = $("#submit");

    // display feedback for error validation
    const isError = (e, info) => {
        e.css("border-bottom", "1px solid red");
        e.siblings(".invalid-feedback").text(info);
        e.siblings(".invalid-feedback").css("display", "block");
    };

    // hide feedback validation
    const isSuccess = (e) => {
        e.css("border-bottom", "1px solid green");
        e.siblings(".invalid-feedback").css("display", "none");
    };

    // check name field
    const checkName = () => {
        let valid = false;
        const name = fname.val();
        if (name == "") {
            isError(fname, "Please fill your name");
        } else if ((name.length < 2) || (name.length > 25)) {
            isError(fname, "Your name must be between 2 and 25 characters")
        } else {
            isSuccess(fname);
            valid = true;
        }
        return valid;
    };

    // check email field
    const checkEmail = () => {
        let valid = false;
        const email = femail.val();
        const at_index = email.indexOf("@");
        const dot_index = email.lastIndexOf(".");
        if (email == "") {
            isError(femail, "Please fill your email");
        } else if ((at_index<1) || (dot_index<at_index+2) || (dot_index+2>=email.length)) {
            isError(femail, "Invalid email")
        } else {
            isSuccess(femail);
            valid = true;
        }
        return valid;
    };

    // check phone number field
    const checkPhone = () => {
        let valid = false;
        const phone = fphone.val();
        if (phone == "") {
            isError(fphone, "Please fill your phone number");
        } else if ((phone.length < 3) || (phone.length > 16)) {
            isError(fphone, "Your phone number must be between 3 and 16 characters")
        } else {
            isSuccess(fphone);
            valid = true;
        }
        return valid;
    };

    // check message field
    const checkMessage = () => {
        let valid = false;
        const message = fmessage.val();
        if (message == "") {
            isError(fmessage, "Please fill your message");
        } else {
            isSuccess(fmessage);
            valid = true;
        }
        return valid;
    };

    // check the fields if input form lose its focus
    $(".form-control").blur(function(e) {
        switch(e.target.id) {
            case "name":
                checkName();
                break;
            case "email":
                checkEmail();
                break;
            case "phone":
                checkPhone();
                break;
            case "message":
                checkMessage();
                break;
        };
    });

    // check the fields if input value is update
    $(".form-control").keyup(function(e) {
        switch(e.target.id) {
            case "name":
                checkName();
                break;
            case "email":
                checkEmail();
                break;
            case "phone":
                checkPhone();
                break;
            case "message":
                checkMessage();
                break;
        };
    });

    // submit form
    fsubmit.click(function(e) {
        // prevent the form from submitting
        e.preventDefault();

        // validate fields
        let isNameValid = checkName(),
            isEmailValid = checkEmail(),
            isPhonevalid = checkPhone(),
            isMessageValid = checkMessage();
        
        let isFormValid = isNameValid && isEmailValid && isPhonevalid && isMessageValid;

        // send email function if form is valid
        if (isFormValid) {
            const to = "hmillah211@gmail.com";
            const email_subject = `Website Contact Form: ${fname.val()}`;
            const email_body = `You have received a new message from your website contact form.%0D%0A%0D%0AHere are the details:%0D%0AName: ${fname.val()}%0D%0AEmail: ${femail.val()}%0D%0APhone: ${fphone.val()}%0D%0AMessage:%0D%0A${fmessage.val()}`;
            window.open(`mailto:${to}?subject=${email_subject}&body=${email_body}`);
        };
    });
});