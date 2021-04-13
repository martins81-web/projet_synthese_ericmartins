import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

type Props = {
    
};

const DashBoardNoRights: React.FC<Props> =()=>{
    return(
        <Grid container >
            <Grid item xs={12}>
                <Grid container justify='center'>
                    <Typography variant='h3'>Vous n'avez pas les droits d'accès à cette page!!!</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashBoardNoRights;