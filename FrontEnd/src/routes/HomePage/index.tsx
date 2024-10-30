import CardIntroduction from '../../components/CardIntroduction';
import './styles.css';

export default function HomePage() {
    return (
        <main>
            <h1 id="title-home-page">Lista de Tarefas</h1>
            <section className="section-home-page">
            <CardIntroduction />
            </section>
        </main>
    );
}