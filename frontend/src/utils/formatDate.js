const formatDate = (dateString) => {
    return dateString.split('.').reverse().join('-')
}

export default formatDate