module.exports = emailVerification;

function emailVerification(verificationUrl, username){
  return(
    `    <table border="0"
               cellpadding="0"
               cellspacing="0"
               width="100%">
        		<tr>
        			<td style="padding: 20px 0 30px 0;">
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
                					<td style="color: #153643;
                                     font-family: Arial, sans-serif;">
                						<h1 style="text-align:center;
                                       font-size: 20px;
                                       margin: 0;">
                              Welcome to Eigopost ${username}!
                              <br />
                              We are so happy you joined.
                            </h1>
                					</td>
                				</tr>
                				<tr>
                					<td style="color: #333333;
                                     font-family: Arial, sans-serif;
                                     font-size: 16px;
                                     line-height: 24px;
                                     padding: 20px 0 30px 0;">
                            <p style="margin: 0;">
                              ${verificationUrl}
                            </p>
                					</td>
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
                						<p style="margin: 0;">
                               &reg; eigopost.com, 2021
                            </p>
                					</td>
                					<td align="right">
                						<table border="0"
                                   cellpadding="0"
                                   cellspacing="0"
                                   style="border-collapse: collapse;">
                							<tr>
                								<td>
                									<a href="http://www.twitter.com/">
                										<img src="https://assets.codepen.io/210284/tw.gif"
                                         alt="Twitter."
                                         width="38"
                                         height="38"
                                         style="display: block;"
                                         border="0"
                                    />
                									</a>
                								</td>
                								<td style="font-size: 0;
                                           line-height: 0;"
                                           width="20">
                                        &nbsp;
                                </td>
                								<td>
                									<a href="http://www.twitter.com/">
                										<img src="https://assets.codepen.io/210284/fb.gif"
                                         alt="Facebook."
                                         width="38"
                                         height="38"
                                         style="display: block;"
                                         border="0" />
                									</a>
                								</td>
                							</tr>
                						</table>
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
