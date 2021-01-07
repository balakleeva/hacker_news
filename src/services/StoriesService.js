import ApiService from './ApiService'

export default {
  getStories() {
    return ApiService.get('/topstories.json')
  },
  getItems(itemId) {
    return ApiService.get(`/item/${itemId}.json`)
  },
}
