import CardIntroduction from '../../components/CardIntroduction';
import Header from '../../components/Header';
import './styles.css';

export default function HomePage() {
    return (
        <>
        <Header />
        <main>
            <section className="section-home-page">
            <CardIntroduction />
            </section>
        </main>
        </>


    );
}