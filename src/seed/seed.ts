import {DataSource} from 'typeorm';
import {Category} from '../category/category.entity';
import {Article} from '../article/article.entity';
import {Admin, Client, Sales, User} from '../user/user.entity';

export async function seedDatabase(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    const articleRepository = dataSource.getRepository(Article);
    const userRepository = dataSource.getRepository(User);

    const categoriesCount = await categoryRepository.count();
    const articlesCount = await articleRepository.count();
    const usersCount = await userRepository.count();

    if (categoriesCount > 0 && articlesCount > 0 && usersCount > 0) {
        console.log('Les données existent déjà, pas de seeding nécessaire.');
        return;
    }

    const categories = [
        {name: 'Smartphones'},
        {name: 'Ordinateurs Portables'},
        {name: 'Accessoires'},
        {name: 'Gaming'},
        {name: 'Objets Connectés'},
    ];

    const savedCategories = await categoryRepository.save(categories);

    const articles = [];
    for (let i = 1; i <= 200; i++) {
        const category = savedCategories[Math.floor(Math.random() * savedCategories.length)];
        articles.push({
            name: `Produit ${i}`,
            reference: `REF-${i}`,
            description: `Description du produit ${i}`,
            quantity: Math.floor(Math.random() * 100) + 1,
            price: Math.floor(Math.random() * 1000) + 50,
            image: `https://img.20mn.fr/dO1_eaf7QzKnwVOZqau72ik/1444x920_amazon-remise-sur-l-ordinateur-portable-mac-book-air-2022-13-6-pouces-apple`,
            category,
        });
    }

    await articleRepository.save(articles);


    const users = [
        {
            type: 'Admin',
            firstName: 'Quentin',
            lastName: 'Dollen',
            email: 'quentin.dollen@insa-cvl.fr',
            password: 'admin123',
        },
        {
            type: 'Sales',
            firstName: 'Julien',
            lastName: 'Sanchez',
            email: 'julien.sanchez@insa-cvl.fr',
            password: 'sales123',
        },
        {
            type: 'Client',
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'client@insa-cvl.fr',
            password: 'client123',
        },
    ];

    for (const userData of users) {
        let user;
        switch (userData.type) {
            case 'Admin':
                user = new Admin();
                break;
            case 'Sales':
                user = new Sales();
                break;
            case 'Client':
                user = new Client();
                break;
        }

        if (user) {
            Object.assign(user, userData);
            await userRepository.save(user);
        }
    }

    console.log('Seeding terminé avec succès.');
}
