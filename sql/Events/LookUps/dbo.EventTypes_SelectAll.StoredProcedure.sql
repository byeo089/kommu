USE [Kommu]
GO
/****** Object:  StoredProcedure [dbo].[EventTypes_SelectAll]    Script Date: 7/18/2022 7:40:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE     PROC [dbo].[EventTypes_SelectAll]


AS
/* ------TEST CODE ------

	EXECUTE		[dbo].[EventTypes_SelectAll]

	SELECT * FROM [dbo].[EventTypes]

*/
BEGIN


		SELECT    [Id]
				  , [Name]

		FROM     [dbo].[EventTypes]



END




GO
