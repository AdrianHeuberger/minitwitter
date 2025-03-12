<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Feed</h1>
    <div class="space-y-4">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :can-delete="post.userId === currentUserId"
        @delete="deletePost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { ref, onMounted } from 'vue';

interface Post {
  id: number;
  userId: number;
  content: string;
  sentiment?: string;
}

const posts = ref<Post[]>([]);
const token = localStorage.getItem('token');
const currentUserId = ref<number | null>(null);

const fetchPosts = async () => {
  try {
    const { data } = await useFetch<Post[]>('/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.value) {
      posts.value = data.value;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const deletePost = async (id: number) => {
  try {
    await useFetch(`/api/posts/${id}`, {
      method: 'delete',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

onMounted(fetchPosts);
</script>
