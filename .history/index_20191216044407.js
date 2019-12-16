var scoperows = 3;
var scopecols = 2;
var scopeimages = [
    {
        type: 2,
        align: 'horizontal',
        data: {
            imageSource: "img/Mercedes/m1.jpg",
            clickCallback: () => {
                console.log("item clicked ");
            },
            text: {
                label: "Mercedes",
                textStyle: {
                    color: "white"
                }
            },
        },
    },
    {
        type: 3,
        align: 'horizontal',
        data: {
            imageSource: "../img/Mercedes/m5.jpg",
            clickCallback: () => {
                console.log("item clicked ");
            },
            text: {
                label: "Wheels",
                textStyle: {
                    color: "White"
                }
            }

        }
    },
    {
        type: 2,
        align: 'horizontal',

        data: {
            imageSource: "./img/Mercedes/m4.jpg",
            clickCallback: () => {
                console.log("item clicked ");
            },

            text: {
                label: "Mercedes",
                textStyle: {
                    color: "White"
                }
            }

        }
    }, 
    {
        type: 2,
        align: 'vertical',

        data: {
            imageSource: "./img/Mercedes/m9.jpg",

            clickCallback: () => {
                console.log("item clicked ");
            },
            text: {
                label: "Benz",
                textStyle: {
                    color: "White"
                }
            }

        }
    },
    {
        type: 1,
        data: {
            imageSource: "./img/Mercedes/m5.jpg",

            clickCallback: () => {
                console.log("item clicked ");
            },
            backgroundStyle: {
                backgroundColor: "#a35dff"
            },
            text: {
                label: "Benz",
                textStyle: {
                    color: "White"
                }
            }

        }
    },
    {
        type: 2,
        align: 'vertical',

        data: {
            imageSource: "./img/Mercedes/m6.jpg",

            clickCallback: () => {
                console.log("item clicked ");
            },
            backgroundStyle: {
                backgroundColor: "#a35dff"
            },
            text: {
                label: "AMG",
                textStyle: {
                    color: "White"
                }
            }

        }
    }]

var scopegridView = new Array(scoperows);
for (let i = 0; i < scopegridView.length; i++) {
    scopegridView[i] = new Array(scopecols);
    for (let j = 0; j < scopegridView[i].length; j++) {
        scopegridView[i][j] = 0;
    }
}

for (let i = 0; i < scopeimages.length; i++) {
    draw(scopeimages[i]);
}

function setStyle(elem, propertyObject) {
    for (var property in propertyObject)
        elem.style[property] = propertyObject[property];
}

function populateDataInField({ row, col, img, divStyle, imageStyle }) {
    if (img.align == 'horizontal') {
        for (let i = 0; i < img.type; i++) {
            scopegridView[row][col + i] = 1;
        }
    }
    else {
        for (let i = 0; i < img.type; i++) {
            scopegridView[row + i][col] = 1;
        }
    }

    let div = document.createElement("DIV");
    let image = document.createElement("IMG");
    let paragraph = document.createElement("P");

    setStyle(div, divStyle);

    if (img.data) {
        div.onclick = img.data.clickCallback;
        setStyle(div, img.data.backgroundStyle);
        if (img.data.imageSource) {
            /**
             * In case of full block image
             * @type {string}
             */
            image.src = img.data.imageSource;
            image.onerror = function () {
                if (img.data.imageErrSrc) {
                    image.src = img.data.imageErrSrc;
                }

            }

            setStyle(image, {
                maxWidth: "100%",
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: '100% 20%',
                borderRadius: "5px"

            });
            setStyle(image, imageStyle);
            div.appendChild(image);
            if (img.data.text && img.data.text.label) {
                setStyle(paragraph, {
                    position: "relative",
                    top: "-52px",
                    wordBreak: 'break-word'
                });
            }
        } else {
            /**
             * In case of small icon only
             */
            if (img.data.icon && img.data.icon.iconSource) {
                image.src = img.data.icon.iconSource;
                setStyle(image, {
                    maxWidth: "50%",
                    padding: "10px"
                });
                setStyle(image, img.data.icon.iconStyle);
                div.appendChild(image);
                if (img.data.text && img.data.text.label) {
                    // setStyle(paragraph, {
                    //   paddingTop: ""
                    // });
                }
            }
        }
        if (img.data.text) {
            if (img.data.text.label) {
                paragraph.innerHTML = img.data.text.label;

                setStyle(paragraph, {
                    textAlign: "center"
                });
                setStyle(paragraph, img.data.text.textStyle);

                div.appendChild(paragraph);
            }
        }
    }
    document.getElementById("wrapper").appendChild(div);
}

function compareRowArray(col, row, gridView, type) {
    if (type == 0) {
        return true;
    } else {
        return (
            gridView[row + type - 1][col] == 0 &&
            compareRowArray(col, row, gridView, type - 1)
        );
    }
}

function compareColArray(col, row, gridView, type) {
    if (type == 0) {
        return true;
    } else {
        return (
            gridView[row][col + type - 1] == 0 &&
            compareColArray(col, row, gridView, type - 1)
        );
    }
}

function addColumn(var_rows, var_cols, gridView) {
    for (let i = 0; i < scoperows; i++) {
        gridView[i].push(0);
    }
    scopecols++;
}

/**
 * return true in case there is no available row
 * @returns {boolean}
 */
function rowCheckAvaialble(row, type) {
    return row < scoperows - type + 1;
}

/**
 * return true in case there is no available column
 * @returns {boolean}
 */
function colCheckAvaialble(col, type) {
    return col < scopecols - type + 1;
}

function checkAvailableSinglePlace() {
    for (var i = 0; i < scoperows; i++) {
        for (var j = 0; j < scopecols; j++) {
            if (scopegridView[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

function checkAvailableVerticalPlace(type) {
    for (let i = 0; i < scoperows; i++) {
        for (let j = 0; j < scopecols; j++) {
            if (i + type - 1 < scoperows)
                if (compareRowArray(j, i, scopegridView, type)) {
                    return true;
                }
        }
    }
    return false;
}

function checkAvailableTripleHorizontalPlace(type) {
    for (let i = 0; i < scoperows; i++) {
        for (let j = 0; j < scopecols; j++) {
            if (j + type - 1 < scopecols)
                if (compareColArray(j, i, scopegridView, type)) {
                    return true;
                }
        }
    }
    return false;
}

function rowPopulation({ row, col, img }) {
    populateDataInField({
        row,
        col,
        img,
        divStyle: {
            gridColumnStart: col + 1,
            gridColumnEnd: col + 2,
            gridRowStart: row + 1,
            gridRowEnd: row + img.type + 1
            // borderRadius:'5px'
        }
    });
}

function colPopulation({ row, col, img }) {
    populateDataInField({
        row,
        col,
        img,
        divStyle: {
            gridColumnStart: col + 1,
            gridColumnEnd: col + 1 + img.type,
            gridRowStart: row + 1,
            gridRowEnd: row + 2
            // borderRadius:'5px'

        }
    });
}

function draw(img) {
    outer_loop: for (let col = 0; col < scopecols; col++) {
        for (let row = 0; row < scoperows; row++) {
            switch (img.align) {
                case 'vertical':
                    if (checkAvailableVerticalPlace(img.type)) {
                        if (rowCheckAvaialble(row, img.type) && compareRowArray(col, row, scopegridView, img.type)) {
                            rowPopulation({ row, col, img });
                            break outer_loop;
                        }

                    } else {
                        addColumn(scoperows, scopecols, scopegridView);
                    }

                    break;
                case 'horizontal':
                    if (checkAvailableTripleHorizontalPlace(img.type)) {
                        if (colCheckAvaialble(col, img.type) && compareColArray(col, row, scopegridView, img.type)) {
                            colPopulation({ row, col, img });
                            break outer_loop;
                        }

                    } else {
                        addColumn(scoperows, scopecols, scopegridView);
                    }
                    break;
                default:
                    if (
                        scopegridView[row][col] != 0 &&
                        !checkAvailableSinglePlace()
                    ) {
                        addColumn(scoperows, scopecols, scopegridView);
                        break;
                    }

                    if (scopegridView[row][col] == 0) {
                        scopegridView[row][col] = 1;
                        populateDataInField({
                            row,
                            col,
                            img,
                            divStyle: {
                                gridColumnStart: col + 1,
                                gridColumnEnd: col + 2,
                                gridRowStart: row + 1,
                                gridRowEnd: row + 2
                                // borderRadius:'5px',

                            }
                        });

                        break outer_loop;
                    }
                    break;
            }
        }
    }
}


