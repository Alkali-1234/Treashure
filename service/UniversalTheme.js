import AsyncStorage from "@react-native-async-storage/async-storage";



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

export const getTheme = async () => {
    return Theme;
}

export const lightTheme = {
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

export const darkTheme = {
    'primary' : '#1F1F1F',
    'secondary' : '#383434',
    'text' : {
        'primary' : '#FFFFFF',
        'secondary' : '#9E9E9E',
    },
    'form' : {
        'background' : 'rgba(255, 255, 255, 0.05)'
    }
}

export const toggleTheme = async () => {
    const currentTheme = await AsyncStorage.getItem('theme');
    if (currentTheme === 'light') {
        await AsyncStorage.setItem('theme', 'dark');
        console.log("Set theme to dark")
    } else {
        await AsyncStorage.setItem('theme', 'light');
        console.log("Set theme to light")
    }

}