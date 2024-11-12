// Veuillez créer deux nouveaux composants : Header & Footer. Il doit être possible :

// d'ajouter n'importe quel type de contenu dans ces deux composants en tant qu'enfants.
// d'afficher un logo (une image) dont l'URL est à passer en propriété.
import './Footer.css';
export interface FooterProps {
    children: React.ReactNode;
}

export const Footer = (props: FooterProps) => {
    return (
        <footer>
            <p>{props.children}</p>
        </footer>
    );
};
