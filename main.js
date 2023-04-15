const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const comment = document.querySelector('#comment')
const likeIcon = document.querySelector('.heart__icon')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.comments__container')

likeIcon.addEventListener('click', likeVideo)
submitBtn.addEventListener('click', submitFeedback)


feedbackArr = []
let positiveFeedback = false
let likesCount = 0

function submitFeedback(e){
    
    const userForm = userName.value 
    const commentForm = comment.value 
    if(userForm && commentForm !== ''){
        newFeedback = {
            "id": Math.floor((Math.random() * 1000)+ 1),
            "userName": userForm,
            "userComment": commentForm,
            "typeOfFeedback": positiveFeedback
        }
        feedbackArr.push(newFeedback)
        if(positiveFeedback === true){
            addLikes()
        }
        resetForm()
        addFeedback(newFeedback)
    }
    e.preventDefault()
}

function likeVideo(){
    likeIcon.classList.toggle('liked')

    if(likeIcon.classList.contains('liked')){
        likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
        // set feedback to liked
        positiveFeedback = true
    } else {
        likeIcon.innerHTML = `<i class="far fa-heart"></i>`
        // set feedback to not liked
        positiveFeedback = false
    }
}

function addLikes(){
    likesCount++
    count.innerHTML = likesCount
}

function resetForm(){
    userName.value = ''
    comment.value = ''
    likeIcon.innerHTML = `<i class="far fa-heart"></i>`
    positiveFeedback = false
}

function addFeedback(item){
    // select first letter of the user name
    const letter = (item.userName).charAt(0)
    // create new div
    const div = document.createElement('div')
    // add class
    div.classList = 'comment__card'
    // add id
    div.id = item.id 
    // add html
    div.innerHTML = `
    <div class="pic center__display">
                    ${letter}
                </div>
                <div class="comment__info">
                    <small class="nickname">
                        ${item.userName}
                    </small>
                    <p class="comment">
                        ${item.userComment}
                    </p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            ${item.typeOfFeedback ? `<i class="fas fa-heart positive"></i>` : `<i class="far fa-heart"></i>`}
                        </div>
                        <button>
                            Reply
                        </button>
                    </div>
                </div>
    `
    // insert feedback into the list
    commentsCont.insertAdjacentElement('beforeend', div)
}
