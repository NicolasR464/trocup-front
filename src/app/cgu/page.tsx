'use client'

import React from 'react'
import Image from 'next/image'

const CGU: React.FC = (): React.JSX.Element => {
    return (
        <div>
            {/* Ajout de la section Hero */}
            <section className='hero-section relative flex items-center justify-center'>
                <div className='relative w-full'>
                    {/* Image de fond */}
                    <Image
                        src='/heroAide.png'
                        alt='Illustration de la plateforme Trocup'
                        layout='responsive'
                        width={1_920}
                        height={1_000}
                        className='max-h-[290px] w-full object-cover shadow-lg'
                    />

                    {/* Texte au centre de l'image */}
                    <h1 className='absolute inset-0 flex translate-y-[-12px] items-center justify-center text-5xl font-bold text-white'>
                        {'Conditions Générales d’utilisation'}
                    </h1>
                </div>
            </section>

            <div className='container mx-auto px-4 py-8'>
                {/* Préambule */}
                <section className='mb-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'Préambule'}
                    </h2>
                    <p className='text-justify leading-relaxed text-gray-600'>
                        {
                            'Les présentes Conditions Générales d’Utilisation (CGU) '
                        }
                        {'régissent l’utilisation de la plateforme de troc '}
                        {
                            '(ci-après dénommée « la Plateforme »). En accédant et en '
                        }
                        {
                            'utilisant la Plateforme, l’utilisateur (ci-après dénommé '
                        }
                        {
                            '« l’Utilisateur ») accepte sans réserve les présentes '
                        }
                        {'CGU.'}
                    </p>
                </section>

                {/* Section 1 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'1. Objet de la Plateforme'}
                    </h2>
                    <p className='text-justify leading-relaxed text-gray-600'>
                        {'La Plateforme est un service d’échanges entre '}
                        {
                            'particuliers permettant aux Utilisateurs de publier des '
                        }
                        {'annonces de produits disponibles pour le troc. La '}
                        {
                            'Plateforme met l’accent sur l’expérience utilisateur, la '
                        }
                        {
                            'sécurité et la transparence des échanges. Les présentes '
                        }
                        {
                            'CGU encadrent l’ensemble des services proposés, que ce '
                        }
                        {'soit en mode gratuit ou en mode Premium.'}
                    </p>
                </section>

                {/* Section 2 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'2. Accès aux Services'}
                    </h2>

                    <h3 className='mb-2 text-xl font-semibold text-gray-600'>
                        {'2.1 Compte Utilisateur'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'Pour utiliser les services de la Plateforme, '}
                        {
                            'l’Utilisateur doit créer un compte en fournissant des '
                        }
                        {
                            'informations exactes et à jour. La création d’un compte '
                        }
                        {' entraîne l’acceptation des présentes CGU.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'2.2 Mode Gratuit'}
                    </h3>
                    <ul className='list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Affichage publicitaire : La navigation est soumise à '
                            }
                            {'la présence de publicités.'}
                        </li>
                        <li>
                            {'Boost d’article : L’Utilisateur peut booster un '}
                            {
                                'article moyennant 2€ pour une meilleure visibilité.'
                            }
                        </li>
                    </ul>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'2.3 Mode Premium (4,99€/mois)'}
                    </h3>
                    <ul className='list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Boost d’articles gratuits : Trois boosts gratuits'
                            }
                            {'par mois sont inclus.'}
                        </li>
                        <li>{'Accès anticipé aux nouveaux articles.'}</li>
                        <li>
                            {'Échanges "one-to-many" après 3 échanges réussis.'}
                        </li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'3. Obligations de l’Utilisateur'}
                    </h2>
                    <ul className='justify list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            {
                                'Soigner les annonces : Utiliser des photos claires '
                            }
                            {'et des descriptions précises.'}
                        </li>
                        <li>
                            {
                                'Publier des produits de qualité : Se limiter à des '
                            }
                            {
                                'articles en bon état et pertinents pour l’échange.'
                            }
                        </li>
                        <li>
                            {'Favoriser l’échange collectif : Participer '}
                            {'activement et positivement aux échanges.'}
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {
                            '4. Limites et Conditions d’Utilisation de la Plateforme'
                        }
                    </h2>

                    <h3 className='mb-2 text-xl font-semibold text-gray-600'>
                        {'4.1 Limite de Publication'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'L’Utilisateur peut publier un maximum de cinq (5) '}
                        {'articles simultanément sur la Plateforme.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'4.2 Valeur Maximale de la Besace'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {
                            'La valeur totale des articles proposés pour le troc par '
                        }
                        {
                            'un Utilisateur ne doit pas excéder 200€ (150€ pour les '
                        }
                        {'Utilisateurs non-Premium).'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'4.3 Renouvellement des Annonces'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'Les annonces ayant plus de six (6) mois sont '}
                        {'automatiquement marquées pour renouvellement afin de '}
                        {'maintenir un flux de produits récents.'}
                    </p>
                </section>

                {/* Section 5 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'5. Sécurité et Gestion des Echanges'}
                    </h2>

                    <h3 className='mb-2 text-xl font-semibold text-gray-600'>
                        {'5.1 Évaluation des Utilisateurs'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {
                            'Après chaque échange, une évaluation est demandée aux '
                        }
                        {
                            'Utilisateurs afin de maintenir la fiabilité des profils '
                        }
                        {'sur la Plateforme.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'5.2 Contestation d’un Objet Non Conforme'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'En cas de réception d’un objet non conforme,'}
                        {'l’Utilisateur dispose de cinq (5) jours ouvrés pour '}
                        {
                            'contester l’échange. La Plateforme pourra procéder à un'
                        }
                        {'prélèvement SEPA si nécessaire.'}
                    </p>

                    <h3 className='mb-2 mt-4 text-xl font-semibold text-gray-600'>
                        {'5.3 Conditions d’Utilisation du Mode "One-to-Many"'}
                    </h3>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'Le mode "one-to-many" est accessible uniquement aux '}
                        {'Utilisateurs Premium ayant effectué trois (3)' }
                        {'transactions réussies et ayant une note moyenne '}
                        {'supérieure à 4/5. La prise d’objets est limitée à '}
                        {'hauteur de 75% de la valeur de la besace de '}
                        {'l’Utilisateur concerné.'}
                    </p>
                </section>

                {/* Section 6 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {
                            '6. Résiliation et Interruption de l’Abonnement Premium'
                        }
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'Si un Utilisateur interrompt son abonnement Premium '}
                        {'alors qu’il est redevable d’un montant dû à la '}
                        {
                            'Plateforme, il s’engage à payer la somme restante. Toute '
                        }
                        {'violation des présentes CGU pourra entraîner la '}
                        {'suspension temporaire ou définitive de l’abonnement '}
                        {
                            'Premium de l’Utilisateur, sans remboursement possible.'
                        }
                    </p>
                </section>

                {/* Section 7 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'7. Modifications des CGU'}
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'La Plateforme se réserve le droit de modifier les '}
                        {
                            'présentes CGU à tout moment. Les modifications seront '
                        }
                        {
                            'communiquées aux Utilisateurs et entreront en vigueur '
                        }
                        {'dans un délai de sept (7) jours. En continuant à '}
                        {'utiliser la Plateforme après ce délai, l’Utilisateur '}
                        {'accepte les modifications.'}
                    </p>
                </section>

                {/* Section 8 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'8. Responsabilité de la Plateforme'}
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'La Plateforme n’est en aucun cas responsable des '}
                        {'dommages indirects pouvant survenir du fait de '}
                        {
                            'l’utilisation du site ou de ses services. L’Utilisateur '
                        }
                        {'reconnaît que la Plateforme agit uniquement comme '}
                        {
                            'intermédiaire dans les échanges et que toute transaction '
                        }
                        {'s’effectue sous sa propre responsabilité.'}
                    </p>
                </section>

                {/* Section 9 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'9. Données Personnelles'}
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {'Les informations personnelles recueillies lors de la '}
                        {
                            'création d’un compte sont traitées conformément à notre '
                        }
                        {
                            'Politique de Confidentialité. L’Utilisateur dispose d’un '
                        }
                        {
                            'droit d’accès, de modification, et de suppression de ses '
                        }
                        {'données personnelles en contactant le support.'}
                    </p>
                </section>

                {/* Section 10 */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'10. Loi Applicable et Juridiction Compétente'}
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {
                            'Les présentes CGU sont soumises à la loi française. En '
                        }
                        {
                            'cas de litige, les parties conviennent de rechercher une '
                        }
                        {'solution amiable avant d’entamer toute procédure '}
                        {
                            'judiciaire. A défaut d’accord, les tribunaux compétents '
                        }
                        {
                            'de [Ville] seront seuls habilités à trancher le litige.'
                        }
                    </p>
                </section>

                {/* Conclusion */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'Acceptation'}
                    </h2>
                    <p className='justify leading-relaxed text-gray-600'>
                        {
                            'En accédant et en utilisant la Plateforme, vous acceptez '
                        }
                        {'pleinement les présentes Conditions Générales '}
                        {'d’Utilisation.'}
                    </p>
                    <p className='justify mt-4 leading-relaxed text-gray-600'>
                        {'Ces CGU couvrent les principales conditions '}
                        {
                            'd’utilisation de la Plateforme de troc et protègent les '
                        }
                        {
                            'intérêts de l’entreprise tout en clarifiant les droits '
                        }
                        {'et obligations des Utilisateurs. Assurez-vous de les '}
                        {
                            'adapter en fonction des spécificités légales de votre '
                        }
                        {
                            'juridiction et de consulter un juriste pour validation '
                        }
                        {'avant publication.'}
                    </p>
                </section>

                {/* Points Clés */}
                <section className='mb-8 border-t border-gray-300 pt-8'>
                    <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                        {'Conditions Générales d’Utilisation - Points Clés'}
                    </h2>
                    <ul className='justify list-inside list-disc space-y-2 text-gray-600'>
                        <li>
                            <strong>{'Accès et Abonnements :'}</strong>{' '}
                            {'Gratuit :\r'}
                            {'Accès aux services avec publicités et boost\r'}
                            {
                                'd’article payant (2€). Premium (4,99€/mois) : Pas de\r'
                            }
                            {'publicités, 3 boosts gratuits par mois, accès\r'}
                            {
                                'exclusif de 3 jours aux nouveaux articles, et accès\r'
                            }
                            {
                                'au mode d’échange "one-to-many" après 3 échanges\r'
                            }
                            {'réussis.\r'}
                        </li>
                        <li>
                            <strong>{'Limites d’Utilisation :'}</strong>{' '}
                            {'Maximum de\r'}
                            {
                                '5 articles publiés simultanément par utilisateur.\r'
                            }
                            {
                                'Valeur maximale de la besace : 200€ (150€ pour les\r'
                            }
                            {
                                'non-premium). Annonces renouvelables tous les 6\r'
                            }
                            {'mois.\r'}
                        </li>
                        <li>
                            <strong>{'Sécurité des Echanges :'}</strong>{' '}
                            {'Évaluations\r'}
                            {
                                'après chaque échange pour assurer la fiabilité des\r'
                            }
                            {
                                'profils. Contestation possible sous 5 jours si un\r'
                            }
                            {
                                'objet reçu est non conforme, avec remboursement en\r'
                            }
                            {
                                'cas de validation. Mode "one-to-many" : limité à 75%\r'
                            }
                            {
                                'de la valeur de la besace après 3 échanges réussis.\r'
                            }
                        </li>
                        <li>
                            <strong>{'Résiliation et Sanctions :'}</strong>{' '}
                            {'En cas\r'}
                            {'d’arrêt de l’abonnement Premium, règlement des\r'}
                            {
                                'montants dus obligatoire. Suspension temporaire ou\r'
                            }
                            {'définitive en cas de non-respect des CGU.\r'}
                        </li>
                        <li>
                            <strong>{'Données et Responsabilité :'}</strong>{' '}
                            {'Respect\r'}
                            {
                                'des données personnelles selon notre Politique de\r'
                            }
                            {'Confidentialité. La Plateforme agit comme\r'}
                            {
                                'intermédiaire, les échanges s’effectuent sous la\r'
                            }
                            {'responsabilité des utilisateurs.\r'}
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default CGU
