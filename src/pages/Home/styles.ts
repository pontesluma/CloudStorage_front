import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root: {
        padding: '20px 70px',
        margin: '20px 10px',
    },
    title: {
        marginBottom: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00f',
        display: 'flex',
        alignItems: 'center',


    },
    file: {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 15px',
    },
    filename: {
        display: 'flex',
        alignItems: 'center',
        color: '#999',
    },
    uploadBtn: {
        background: '#00f',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        '&:hover': {
            backgroundColor: '#0000cc',
            borderColor: '#0000bb',
            boxShadow: 'none',
          },
    },
    labelBtn: {
        display: 'flex',
        alignItems: 'center',
    },
    loading: {
        color: '#aaa',
        fontSize: 20,
        fontWeight: 'normal',
        marginLeft: 20,
        marginBottom: -5,
    }
});