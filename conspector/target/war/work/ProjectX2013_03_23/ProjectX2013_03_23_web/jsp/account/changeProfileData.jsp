<%--
  #%L
  ProjectX2013_03_23_web
  %%
  Copyright (C) 2013 - 2014 Powered by Sergey
  %%
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
       http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  #L%
  --%>
<%@ page import="com.projectx.*" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	String userName = session.getAttribute("userName").toString();

	if(userName == null || userName == "" || userName == "Guest"){
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		return;
	}

	String newPassword = request.getParameter("newPassword");
	String oldPassword = request.getParameter("oldPassword");
	String eMail = request.getParameter("email");
	String baseURL = request.getRequestURL().toString().replace(request.getRequestURI(), request.getContextPath()) + "/";
	String language = request.getParameter("language");
	String avatarFileIdString = request.getParameter("avatarFileId");
	Long avatarFileId = avatarFileIdString == null ? -1 : Long.parseLong(avatarFileIdString);
	response.getWriter().write("{\"messages\":" + ToJSONUtil.toJSON(new AccountService().changeProfileData(userName, oldPassword, newPassword, eMail, null, language, avatarFileId, baseURL)) + "}");
%>