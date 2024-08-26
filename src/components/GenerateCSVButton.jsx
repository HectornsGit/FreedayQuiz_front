import useGenerateCSVButton from '@/hooks/useGenerateCSVButton';

const GenerateCSVButton = ({ playerData, quizData }) => {
    const { handleCSV } = useGenerateCSVButton(playerData, quizData);
    return <button onClick={handleCSV}>Descargar resultados</button>;
};

export default GenerateCSVButton;
