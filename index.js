document.addEventListener('DOMContentLoaded', function () {
    const booksContainer= document.getElementById('book-container')
   
    let likes=0
    let allBooks= []

   
    
     fetch('https://potterapi-fedeperin.vercel.app/en/books')
    .then(res=>res.json())
    .then(books => {
        allBooks=books
        displayBooks(allBooks)
        })
    
    .catch(error=> console.error('error fetching', error))


function displayBooks(books) {
     booksContainer.innerHTML=''
    books.forEach(book => {
        const bookCard= createBookCard(book)
         booksContainer.appendChild(bookCard)
    })       
}

function createBookCard(book) {
    
const bookCard= document.createElement('div')
bookCard.classList.add('book-card')

const bookTitle= document.createElement('h2')
bookTitle.textContent= book.title
bookCard.appendChild(bookTitle)
bookTitle.addEventListener('mouseover', function () {
    bookTitle.style.textDecoration= 'underline'
    
})
bookTitle.addEventListener('mouseout', function () {
    bookTitle.style.textDecoration= 'none'
    
})

const bookDescription= document.createElement('p')
bookDescription.textContent=book.description
bookDescription.id= 'description'
bookCard.appendChild(bookDescription)

const bookRelease= document.createElement('p')
bookRelease.textContent= `Release Date: ${book.releaseDate}`
bookCard.appendChild(bookRelease)

const bookPages= document.createElement('p')
bookPages.textContent=`pages: ${book.pages}`
bookCard.appendChild(bookPages)

const bookCover=document.createElement('img')
bookCover.src=book.cover
bookCard.appendChild(bookCover)
bookCover.classList.add('book-avatar')

const likesDiv= document.createElement('div')
const likeBtn= document.createElement('button')
likeBtn.textContent= '❤️'

likeBtn.classList.add('like-btn')
likesDiv.appendChild(likeBtn)

const likeCount= document.createElement('p')

likesDiv.appendChild(likeCount)
bookCard.appendChild(likesDiv)


likeBtn.addEventListener('mouseover', function () {
    likeBtn.style.backgroundColor= 'red'
})
likeBtn.addEventListener('mouseout', function () {
    likeBtn.style.backgroundColor= '';
})

likeBtn.addEventListener('click', function () {
    //increase like by one
    likes++
   // update like count
   likeCount.textContent= `${likes} ${likes ===1 ? 'like' : 'likes'}`
   
   

})

const commentsForm= document.createElement('form')
commentsForm.classList.add=('comments-form')
bookCard.appendChild(commentsForm)

const commentInput= document.createElement('input')
commentInput.classList.add('comment-input')
commentInput.type='text'
commentInput.placeholder='Add comment'
commentsForm.appendChild(commentInput)

const submitBtn= document.createElement('button')
submitBtn.type='submit'
submitBtn.textContent='Post'
submitBtn.classList.add('post-btn')
commentsForm.appendChild(submitBtn)


    commentsForm.addEventListener('submit', function (event) {
    event.preventDefault()
    //create list for the comment
    const commentText= commentInput.value.trim()
    const listItem= document.createElement('li')
    listItem.textContent= commentText
    
    //append new comment to comment list
    const commentList= document.createElement('ul')
    commentList.appendChild(listItem)
    commentsForm.appendChild(commentList)

    commentInput.value=''
    })
    
return bookCard
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const filteredBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchInput))
    displayBooks(filteredBooks);
});

})