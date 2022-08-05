export const formatDateToServerFormat = (dateString: string): string => {
    return dateString.split('.').reverse().join('-')
}

export const formatDateToClientFormat = (dateString: string): string => {
    if(dateString.includes('T')) 
        dateString = dateString.split('T')[0]
    return dateString.split('-').reverse().join('.')
}
