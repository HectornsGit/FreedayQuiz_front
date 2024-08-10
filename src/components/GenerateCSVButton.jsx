import useApiRequest from '@/hooks/useApiRequest';
import { formatDate } from '@/quizEngine/utils/index';
import { toast } from 'react-toastify';

const GenerateCSVButton = ({ playerData }) => {
    const { fetchData } = useApiRequest();

    const onSuccessCSV = async (data) => {
        toast.success('Datos convertidos correctamente a CSV');
        const date = new Date().toISOString();
        const formattedDate = formatDate(date);

        //Esto es para que se simule un botón en el DOM que se clica automáticamente para iniciar la descarga del archivo en el navegador del cliente:
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${playerData.title}"-"${formattedDate}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const onErrorCSV = (error) => {
        toast.error(error.error);
        console.log(error);
    };

    const handleCSV = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const urlData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        };
        const urlGetCSV = process.env.NEXT_PUBLIC_API_HOST + '/generate-csv';
        const getBlob = true;

        fetchData(urlGetCSV, urlData, onSuccessCSV, onErrorCSV, getBlob);
    };

    return <button onClick={handleCSV}>Descargar CSV</button>;
};

export default GenerateCSVButton;
