import axios from 'axios'

interface Post {
  userId: number
  id?: number // id é opcional no POST
  title: string
  body: string
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

async function fetchAllPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(API_URL)
  return response.data
}

async function createPost(post: Post): Promise<Post> {
  const response = await axios.post<Post>(API_URL, post)
  return response.data
}

async function main(): Promise<void> {
  try {
    console.log('📥 Buscando os primeiros 3 posts:')
    const posts = await fetchAllPosts()
    posts.slice(0, 3).forEach(post => {
      console.log(`- [${post.id}] ${post.title}`)
    })

    console.log('\n✍️ Criando um novo post de teste:')
    const newPost: Post = {
      userId: 99,
      title: 'Novo post de teste',
      body: 'Este é um corpo simulado de post.'
    }

    const created = await createPost(newPost)
    console.log(`✅ Post criado com ID: ${created.id}`)
    console.log(created)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro HTTP:', error.message)
    } else {
      console.error('Erro inesperado:', error)
    }
  }
}

main()

