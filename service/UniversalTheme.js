export let Theme = {
    'primary' : '#FCFEFF',
    'secondary' : '#D9D9D9',
    'text' : {
        'primary' : '#000000',
        'secondary' : '#9E9E9E',
    },
    'form' : {
        'background' : 'rgba(0, 0, 0, 0.05)'
    }
}

const lightTheme = {
    'primary' : '#FCFEFF',
    'secondary' : '#D9D9D9',
    'text' : {
        'primary' : '#000000',
        'secondary' : '#9E9E9E',
    },
    'form' : {
        'background' : 'rgba(0, 0, 0, 0.05)'
    }
}

const darkTheme = {
    'primary' : '#1F1F1F',
    'secondary' : 'rgba(255, 255, 255, 0.1)',
    'text' : {
        'primary' : '#FFFFFF',
        'secondary' : '#9E9E9E',
    },
    'form' : {
        'background' : 'rgba(255, 255, 255, 0.05)'
    }
}

export const toggleTheme = () => {
    if (Theme === lightTheme) {
        Theme = darkTheme;
    } else {
        Theme = lightTheme;
    }
}