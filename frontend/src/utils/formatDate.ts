const formatDate = (dateString: string): string => {
    return dateString.split('.').reverse().join('-')
}

export default formatDate