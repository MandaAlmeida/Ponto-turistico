export class AttractionsTourist {
    constructor() {
        this.list = [
            {
                picture: 'img/Pao-de-acucar.png',
                title: 'Pão de Açúcar',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.'
            },
            {
                picture: 'img/Cristo-Redentor.png',
                title: 'Cristo Redentor',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.'
            },
            {
                picture: 'img/Ilha-Grandes.png',
                title: 'Ilha Grandes',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.'
            },
            {
                picture: 'img/Centro-Histórico-de-Paraty.png',
                title: 'Centro Histórico de Paraty',
                description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dosa amet sint. Velit officia consece duis enim velit mollit.'
            },
        ];

        this.selectors();
        this.events();
        this.renderListItems();
        this.addCarrossel();



    }


    selectors() {
        this.form = document.querySelector('.form');
        this.pictureInput = document.querySelector('#picture_input');
        this.pictureImage = document.querySelector('.picture_image');
        this.pictureImageTxt = 'Imagem';
        this.pictureImage.innerHTML = this.pictureImageTxt;
        this.titleInput = document.querySelector('#item-title');
        this.descriptionInput = document.querySelector('#item-description');
        this.items = document.querySelector('.items-result');
    }

    events() {
        this.pictureInput.addEventListener('change', this.addPreviewImage.bind(this));
        this.form.addEventListener('submit', this.addItemToList.bind(this));
    }

    addPreviewImage(e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('picture-img');
                this.pictureImage.innerHTML = "";
                this.pictureImage.appendChild(img);

            })

            reader.readAsDataURL(file);

        } else {
            this.pictureImage.innerHTML = this.pictureImageTxt;

        }
    };

    addItemToList(e) {
        e.preventDefault();
        const itemPicture = this.pictureImage.children[0].src;
        const itemTitle = e.target['item-title'].value;
        const itemDescription = e.target['item-description'].value;

        if (itemPicture && itemTitle && itemDescription != "") {
            const item = {
                picture: itemPicture,
                title: itemTitle,
                description: itemDescription
            };

            this.list.push(item);

            this.removeCarrossel();

            this.renderListItems();
            this.resetInputs();


        }

    }

    renderListItems() {
        let itemsStructure = "";

        this.list.forEach((item) => {
            itemsStructure += `
                <li class="item-result" data-test="container-item-list">
                    <figure class="result-image"><img data-test="image-item-list" class="image-result" src="${item.picture}">
                    <figcaption class="result-text" data-test="item-list">
                    <h3 data-test="title-item-list" class="result-text-title">${item.title}</h3>
                    <p data-test="description-item-list"class="result-text-description">${item.description}</p>
                    </figcaption></figure>

                </li>
            `;
        });
        this.items.innerHTML = itemsStructure;

        this.addCarrossel();

    };

    resetInputs() {
        this.pictureImage.innerHTML = this.pictureImageTxt;
        this.titleInput.value = "";
        this.descriptionInput.value = "";
    };

    addCarrossel() {
        if (window.innerWidth > 1024) {
            $('.items-result').not('.slick-initialized').slick({
                arrows: true,
                dots: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: '<button type="button" ><img class="slick-prev" src="svgs/arrowPrev.svg"/></button>',
                nextArrow: '<button type="button" ><img class="slick-next" src="svgs/arrowNext.svg"/></button>'
            })
        }

    }

    removeCarrossel() {
        if (window.innerWidth > 1024) {
            $('.items-result').slick('unslick');
        }
    }

}
