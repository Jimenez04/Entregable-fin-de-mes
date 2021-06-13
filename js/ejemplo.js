function RecargarCanton()
{
    fetch("https://api.themoviedb.org/3/movie/76341?api_key=133e62f28b7a78182442c73f2c90e8b9")
        .then(function (result)
        {
            if (result.ok)
            {
                return result.json();
            }
        })
        .then(function (NuevosCantones)
        {
            console.log(NuevosCantones);
        })
}

function ObtenerGeneros()
{
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=133e62f28b7a78182442c73f2c90e8b9&language=es")
        .then(function (result)
        {
            if (result.ok)
            {
                return result.json();
            }
        })
        .then(function (NuevosCantones)
        {
            console.log(NuevosCantones);
        })
}