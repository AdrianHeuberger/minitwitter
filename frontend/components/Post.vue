<template>
  <div class="bg-white rounded-lg p-4 border border-gray-200">
    <div class="flex items-start justify-between">
      <div class="space-y-2 w-full">
        <!-- Post Content -->
        <p class="text-gray-900">{{ post.content }}</p>

        <!-- Correction Message -->
        <div v-if="post.correction" class="mt-2">
          <p class="text-sm text-gray-600">
            Suggested correction: {{ post.correction }}
          </p>
        </div>

        <!-- Sentiment Badge -->
        <div class="flex items-center gap-2 mt-2">
          <span
            v-if="post.sentiment"
            :class="{
              'bg-green-100 text-green-800': post.sentiment === 'positive',
              'bg-yellow-100 text-yellow-800': post.sentiment === 'neutral',
              'bg-red-100 text-red-800': post.sentiment === 'dangerous'
            }"
            class="text-xs px-2 py-1 rounded-full"
          >
            {{ post.sentiment }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 mt-4">
          <button
            v-if="canDelete"
            @click="$emit('delete', post.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post {
  id: number;
  content: string;
  sentiment?: string;
  correction?: string;
  userId: number;
}

const props = defineProps<{
  post: Post;
  canDelete: boolean;
}>();

defineEmits<{
  (e: 'delete', id: number): void;
}>();
</script>