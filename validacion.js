const moviesByGenreAndAge = [
    {
    minAge: 0,
    maxAge: 12,
    genres: {
        'Animación': [
        'Toy Story (1995)',
        'Buscando a Nemo (2003)',
        'Mi vecino Totoro (1988)'
      ],
        'Comedia Familiar': [
        'Matilda (1996)',
        'La gran aventura de Winnie the Pooh (2011)'
      ],
        'Aventura': [
        'El libro de la selva (1967)',
        'Harry Potter y la piedra filosofal (2001)'
      ]
        }
      },
      {
        minAge: 13,
        maxAge: 17,
        genres: {
          'Comedia': [
            'Superbad (2007)',
            'Easy A (2010)'
          ],
          'Romance': [
            'A todos los chicos de los que me enamoré (2018)',
            'Bajo la misma estrella (2014)'
          ],
          'Drama': [
            'Los juegos del hambre (2012)',
            'El club de los cinco (1985)'
          ],
          'Musical': [
            'High School Musical (2006)',
            'La La Land (2016)'
          ]
        }
      },
{
    minAge: 18,
    maxAge: 60,
    genres: {
        'Drama': [
        'El Padrino (1972)',
        'La lista de Schindler (1993)',
        'Forrest Gump (1994)'
        ],
        'Crimen': [
        'El silencio de los inocentes (1991)',
        'Pulp Fiction (1994)'
        ],
        'Romance': [
        'Titanic (1997)',
        'Diario de una pasión (2004)'
        ],
        'Comedia': [
        'El gran hotel Budapest (2014)',
        'Un pez llamado Wanda (1988)'
        ],
        'Musical': [
        'Moulin Rouge! (2001)',
        'Chicago (2002)'
        ]
    }
},
{
    minAge: 61,
    maxAge: 120,
    genres: {
        'Clásicos': [
        'Casablanca (1942)',
        'Lo que el viento se llevó (1939)'
        ],
        'Drama': [
        'Cinema Paradiso (1988)',
        'Amour (2012)'
        ],
        'Romance': [
        'Orgullo y prejuicio (2005)',
        'El diario de Noa (2004)'
        ]
    }
}
];

const ageInput = document.getElementById('ageInput');
const recommendBtn = document.getElementById('recommendBtn');
const recommendationsDiv = document.getElementById('recommendations');
const errorMessageDiv = document.getElementById('errorMessage');

    function clearRecommendations() {
      recommendationsDiv.innerHTML = '';
      errorMessageDiv.textContent = '';
    }

    function createGenreSection(genre, movies) {
      const section = document.createElement('div');
      section.classList.add('genre-section');

      const genreTitle = document.createElement('h3');
      genreTitle.textContent = genre;
      section.appendChild(genreTitle);

      const list = document.createElement('ul');
      movies.forEach(movie => {
        const item = document.createElement('li');
        item.textContent = movie;
        list.appendChild(item);
      });
      section.appendChild(list);

      return section;
    }

    function recommendMovies(age) {
      clearRecommendations();

      if (isNaN(age) || age < 0 || age > 120) {
        errorMessageDiv.textContent = 'Por favor ingresa una edad válida entre 0 y 120 años.';
        return;
      }

      const group = moviesByGenreAndAge.find(g => age >= g.minAge && age <= g.maxAge);
      if (!group) {
        errorMessageDiv.textContent = 'No se encontraron recomendaciones para tu edad.';
        return;
      }

      for (const [genre, movies] of Object.entries(group.genres)) {
        const genreSection = createGenreSection(genre, movies);
        recommendationsDiv.appendChild(genreSection);
      }
    }

    recommendBtn.addEventListener('click', () => {
      const age = parseInt(ageInput.value, 10);
      recommendMovies(age);
    });

    ageInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        recommendBtn.click();
      }
    });