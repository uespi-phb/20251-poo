import axios from 'axios'

interface Post {
  userId: number
  id?: number
  title: string
  body: string
}

const API_BASEURL = 'https://jsonplaceholder.typicode.com'

async function fetchAllPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(`${API_BASEURL}/posts`)
  return response.data
}

async function createPost(post: Post): Promise<Post> {
  const response = await axios.post<Post>(`${API_BASEURL}/posts`, post)
  return response.data
}

async function main(): Promise<void> {
  try {
    console.log('\n✍️ Criando um novo post de teste:')
    const newPost: Post = {
      userId: 99,
      title: 'Novo post de teste',
      body: 'Este é um corpo simulado de post.',
    }

    const created = await createPost(newPost)
    console.log(`✅ Post criado com ID: ${created.id}`)
    console.log(created)

    console.log('📥 Buscando os primeiros 3 posts:')
    const posts = await fetchAllPosts()
    posts.forEach((post) => {
      console.log(`- [${post.id}] ${post.title}`)
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro HTTP:', error.message)
    } else {
      console.error('Erro inesperado:', error)
    }
  }
}

main()
