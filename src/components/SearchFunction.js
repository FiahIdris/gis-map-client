
export default function searchItem(data, item) {
  const allData = data

  const newDataSearch = []

  allData.map((data) => {
    const label = data.name
    if (label.indexOf(item) !== 1) {
      newDataSearch.push(label)
    }
  })
  return newDataSearch
}