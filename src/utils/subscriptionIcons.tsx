import {
  SiNetflix,
  SiSpotify,
  SiYoutube,
  SiAmazon,
  SiApple,
  SiCrunchyroll,
  SiHbo,
  SiPlaystation,
  SiNintendoswitch,
  SiAdobe,
  SiGithub,
  SiGoogle
} from 'react-icons/si';
import { FaMicrosoft, FaXbox } from 'react-icons/fa';
import { TbBrandDisney } from 'react-icons/tb';

export const subscriptionIcons: { [key: string]: any } = {
  'netflix': SiNetflix,
  'spotify': SiSpotify,
  'youtube': SiYoutube,
  'disney+': TbBrandDisney,
  'disney plus': TbBrandDisney,
  'amazon': SiAmazon,
  'prime': SiAmazon,
  'apple': SiApple,
  'apple tv': SiApple,
  'apple music': SiApple,
  'crunchyroll': SiCrunchyroll,
  'hbo': SiHbo,
  'hbo max': SiHbo,
  'playstation': SiPlaystation,
  'ps plus': SiPlaystation,
  'xbox': FaXbox,
  'xbox game pass': FaXbox,
  'nintendo': SiNintendoswitch,
  'nintendo switch online': SiNintendoswitch,
  'adobe': SiAdobe,
  'creative cloud': SiAdobe,
  'github': SiGithub,
  'microsoft': FaMicrosoft,
  'office': FaMicrosoft,
  'google': SiGoogle,
};

export const getSubscriptionIcon = (name: string) => {
  const lowercaseName = name.toLowerCase();
  for (const [key, Icon] of Object.entries(subscriptionIcons)) {
    if (lowercaseName.includes(key)) {
      return Icon;
    }
  }
  return null;
}; 