import useGenerateCSVButton from '@/hooks/useGenerateCSVButton';
import ScoreButton from './MatchComponents/Manager/ScoreButton';

const GenerateCSVButton = ({ playerData, quizData }) => {
    const { handleCSV } = useGenerateCSVButton(playerData, quizData);
    return (
        <ScoreButton handleClick={handleCSV} text={'Descargar resultados'} />
    );
};

export default GenerateCSVButton;
