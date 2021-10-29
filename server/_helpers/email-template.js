module.exports = emailTemplate;

function emailTemplate(messageWithToken){
  return(
    `<table border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%">
      <tr>
          <td style="padding: 20px 0 30px 0">
            <table align="center"
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   width="600"
                   style="border-collapse: collapse;
                          border: 1px solid #999999;">
              <tr>
                  <td align="center"
                      bgcolor="#fff"
                      style="padding: 40px 0 30px 0;">
                    <img src="https://eigopost.com/d4f6bf42bc8b9280386e7eef156e4ceb.png"
                         alt="Welcome to Eigopost"
                         width="250"
                         height="250"
                         style="display: block;" />
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#ffffff"
                      style="padding: 40px 30px 40px 30px;">
                     <table border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="border-collapse: collapse;">
                         <tr>
                           ${messageWithToken}
                         </tr>
                     </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#ee4c50"
                      style="padding: 30px 30px;">
                    <table border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="border-collapse: collapse;">
                        <tr>
                            <td style="color: #ffffff;
                                      font-family: Arial, sans-serif;
                                      font-size: 14px;">
                                <p style="margin: 0;
                                         text-align:center">
                                  <a href="https://eigopost.com"
                                     style="color:#ffffff;
                                            text-decoration:none;
                                            font-weight:bold">
                                    eigopost.com
                                  </a>
                                  2021
                                  &reg;
                                </p>
                            </td>
                        </tr>
                    </table>
                  </td>
              </tr>
            </table>
          </td>
       </tr>
    </table>`
  )
}
