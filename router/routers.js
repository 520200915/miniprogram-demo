export default __wxConfig.pages.map(item => ({
  url: `/${item}`,
  name: item.split('/').pop(),
  parent: item.split('/')[0]
}))