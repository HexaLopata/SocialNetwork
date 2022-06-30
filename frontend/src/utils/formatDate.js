export default (dateString) => {
    return dateString.split('.').reverse().join('-')
}