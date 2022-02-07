import 'styled-components'; /* importação so style-components */
import theme from './theme'; 

declare module 'styled-components' {
  type ThemeType = typeof theme /* cria um novo tipo "ThemeType" com os atributos de theme */

  export interface DefaultTheme extends ThemeType {} /* exporta o defaulttheme do styled-components com a adição de todos atributos do ThemeType */
}