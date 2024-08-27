import { ref } from 'vue'
import { useQuery } from 'vue-query'
import apiClient from '@/utils/axios'

const fetchTodoList = (lang) => {
  const res = apiClient.get(`/user/privacy-policy/?language=${lang}`)
  return res
}

export const usePrivacy = (enabled = true) => {
  const filtersref = ref('uzbek')
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['privacyPolicy'],
    () => fetchTodoList(filtersref.value),
    {
      enabled,
    }
  )

  const updatefilters = (langs) => {
    filtersref.value = langs
    refetch.value()
  }

  return {
    data,
    isLoading,
    isError,
    error,
    updatefilters,
  }
}

const fetchDelete = (deleteP) => {
  const res = apiClient.delete(`/user/privacy-policy/${deleteP}/`)
  console.log('okko')
  return res
}

export const usePrivacyDelete = (enabled = false) => {
  const deletePrivacy = ref('')
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['privacyDelete'],
    () => fetchDelete(deletePrivacy.value),
    {
      enabled,
    }
  )

  const updatedelete = (deleteP) => {
    deletePrivacy.value = deleteP
    refetch.value()
  }

  return {
    data,
    isLoading,
    isError,
    error,
    updatedelete,
  }
}
