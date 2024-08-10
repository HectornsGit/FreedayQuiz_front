const formatDate = (date) => {
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const days = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
    ];

    const d = new Date(date);

    const dayOfMonth = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const dayOfWeek = days[d.getDay()];

    return `${dayOfWeek}, ${dayOfMonth} de ${month} de ${year}`;
};
export default formatDate;
