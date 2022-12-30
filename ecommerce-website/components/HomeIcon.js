import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Image from 'next/image';


function HomeIcon() {
  return (
    //<SvgIcon component={googleCloudLogo} inheritViewBox/>
    <Image src="/google_cloud-icon.svg" alt="logoGCP" height={40} width={40}/>
  );
}

export default HomeIcon;
