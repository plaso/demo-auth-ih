window.addEventListener('load', () => {
  const deleteButtons = document.querySelectorAll(".delete-book-btn")

  const deleteBook = (url, bookContainer) => {
    axios.delete(url)
      .then(res => {
        bookContainer.remove()

        axios.get('http://localhost:8000/cities')
          .then(res => {
            console.log(res.data)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteButtons.forEach(button => {
    const { id } = button.dataset;
    const url = `http://localhost:3000/books/${id}`
    const bookContainer = button.parentElement.parentElement.parentElement

    button.addEventListener('click', () => deleteBook(url, bookContainer))
  })
})
